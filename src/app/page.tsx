'use client'
import React, { useState, useEffect } from 'react';
import styles from "@/app/page.module.css"
import { useRouter } from 'next/navigation';
import useUser from '@/hook/useUser';
import { User } from '@/types/userTypes';
import LoadingSpinner from '@/component/loading/Loader';



export default function Home() {

  const [users, setUsers] = useState<User[]>([]);

  const router = useRouter()
  const { fetchAllUser, loading } = useUser()

  useEffect(() => {
    fetchAllUser().then(data => { console.log('fetched data', data); setUsers(data) })
  }, []);


  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>User List</h1>

      </header>

      <div className={styles.content}>
        {!loading ? <div className={styles.userGrid}>
          {users.map(user => (
            <div
              key={user.id}
              onClick={() => router.push(`/user/${user.id}`)}
              className={styles.userCard}
            >
              <div className={styles.userAvatar}>
                {user.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className={styles.userInfo}>
                <h3 className={styles.userName}>{user.name}</h3>
                <p className={styles.userUsername}>@{user.username}</p>
                <p className={styles.userEmail}>{user.email}</p>
                <div className={styles.companyBadge}>
                  {user.company.name}
                </div>
              </div>
            </div>
          ))}
        </div> :

          <div className={styles.loaderWrapper}>

            <LoadingSpinner size={50} color="#ff6600" />
          </div>}
      </div>


    </div>
  );
};