'use client'
import styles from '@/app/user/[id]/singleUser.module.css'
import homeStyles from "@/app/page.module.css"
import LoadingSpinner from '@/component/loading/Loader';
import useUser from '@/hook/useUser';
import { User } from '@/types/userTypes';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function SingleUser() {

    const router = useRouter()
    const params = useParams();
    const id = params.id;
    const [user, setUser] = useState<User>()
    const { fetchSingleUser, loading } = useUser()
    useEffect(() => {
        fetchSingleUser(id as string).then(data => setUser(data))
    }, [id])


    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <button className={styles.backButton} onClick={() => router.back()} >
                    ← Back to Users
                </button>
            </header>

            {user && !loading ? <div className={styles.content}>
                <div className={styles.profileCard}>
                    <div className={styles.profileHeader}>
                        <div className={styles.avatar}>
                            {user.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className={styles.profileInfo}>
                            <h1 className={styles.name}>{user.name}</h1>
                            <p className={styles.username}>@{user.username}</p>
                        </div>
                    </div>

                    <div className={styles.sections}>
                        {/* Contact Section */}
                        <div className={styles.section}>
                            <div className={styles.sectionHeader}>
                                <span className={styles.icon}>📧</span>
                                <h2 className={styles.sectionTitle}>Contact Information</h2>
                            </div>
                            <div className={styles.infoGrid}>
                                <div className={styles.infoItem}>
                                    <span className={styles.label}>Email</span>
                                    <a href={`mailto:${user.email}`} className={styles.link}>
                                        {user.email}
                                    </a>
                                </div>
                                <div className={styles.infoItem}>
                                    <span className={styles.label}>Phone</span>
                                    <a href={`tel:${user.phone}`} className={styles.link}>
                                        {user.phone}
                                    </a>
                                </div>
                                <div className={styles.infoItem}>
                                    <span className={styles.label}>Website</span>
                                    <a href={`https://${user.website}`} target="_blank" rel="noopener noreferrer" className={styles.link}>
                                        {user.website}
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Address Section */}
                        <div className={styles.section}>
                            <div className={styles.sectionHeader}>
                                <span className={styles.icon}>📍</span>
                                <h2 className={styles.sectionTitle}>Address</h2>
                            </div>
                            <div className={styles.addressBox}>
                                <p className={styles.addressLine}>
                                    {user.address.street}, {user.address.suite}
                                </p>
                                <p className={styles.addressLine}>
                                    {user.address.city}, {user.address.zipcode}
                                </p>
                                <p className={styles.coordinates}>
                                    Coordinates: {user.address.geo.lat}, {user.address.geo.lng}
                                </p>
                            </div>
                        </div>

                        {/* Company Section */}
                        <div className={styles.section}>
                            <div className={styles.sectionHeader}>
                                <span className={styles.icon}>🏢</span>
                                <h2 className={styles.sectionTitle}>Company</h2>
                            </div>
                            <div className={styles.companyBox}>
                                <h3 className={styles.companyName}>{user.company.name}</h3>
                                <p className={styles.catchPhrase}>{user.company.catchPhrase}</p>
                                <div className={styles.bsBadge}>
                                    {user.company.bs}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> :
                <div className={homeStyles.loaderWrapper}>

                    <LoadingSpinner size={50} color="#ff6600" />
                </div>}
        </div>
    );
};