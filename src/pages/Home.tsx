import Layout from '../layouts/layouts'
import {auth }from '../firebase';

export default function Home() {
    const user = auth.currentUser;
    return (
    <Layout>
        <h1>Home</h1>
        <h1> Welcome {user?.email}</h1>
    </Layout>

    )
}