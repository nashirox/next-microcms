import { client } from "../../libs/client"
import styles from '../../styles/Home.module.scss'

export default function BlogId({ blog }) {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>{ blog.title }</h1>
      <p className={styles.publishedAt}>{blog.publishedAt}</p>
      <div dangerouslySetInnerHTML={{
        __html: `${blog.body}`,
      }}
        className={styles.post}
      />
    </main>
  )
}

export const getStaticPaths = async () => {
  const data = await client.get({ endpoint: "weblog" })

  const paths = data.contents.map((content) => `/blog/${content.id}`)
  return { paths, fallback: false }
}

export const getStaticProps = async (context) => {
  const id = context.params.id
  const data = await client.get({ endpoint: "weblog", contentId: id })

  return {
    props: {
      blog: data
    }
  }
}
