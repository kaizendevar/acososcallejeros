import Head from 'next/head'
import db from '../../utils/db'

const Post = ({ post }) => {
    const { id, descripcion, calle, altura, usuario } = post;

    return (
        <>
            <Head>
                <title>{descripcion}</title>
                <meta charSet="utf-8" />
                <meta
                name="viewport"
                content="width=device-width, initial-scale=1, shrink-to-fit=no"
                />
                <meta property="og:title" content={descripcion} key="title" />
            </Head>
            <div>
                <p>{id}</p>
                <p>{descripcion}</p>
                <p>{calle}</p>
                <p>{altura}</p>
                <p>{usuario}</p>
            </div>
        </>
    );
};

export const getServerSideProps = async ({ params }) => {
    const { id } = params;
    const post = await db.collection('posts').doc(id).get();
    const postData = post.data();

    return {
        props: {
            post: postData,
        },
    };
}

export default Post;