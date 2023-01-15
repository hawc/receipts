import Link from 'next/link';
import { loadPosts } from '@/lib/contentful';
import { ChangeEvent, useState } from 'react';

export async function getStaticProps() {
  const posts = await loadPosts(`receipt`);
  const categories = await loadPosts(`category`);
  return {
    props: {
      posts: JSON.stringify(posts),
      categories: JSON.stringify(categories),
    },
  };
}

interface Receipt {
  readonly fields: ReceiptFields;
  readonly metadata: any;
  readonly sys: any;
}
interface ReceiptFields {
  readonly name: string;
  readonly description: string;
  readonly category: string;
  readonly ingredients: string[];
}

export default function Home({ posts, categories }) {
  const postdata = JSON.parse(posts);
  const categorydata = JSON.parse(categories);
  const [filteredPosts, setFilteredPosts] = useState(postdata);

  const postListItems = postdata.map((post: Receipt) => {
    const isFiltered = filteredPosts
      .map((filteredPost) => filteredPost.sys.id)
      .includes(post.sys.id);
    const opacityClass = isFiltered ? `` : `opacity-50`;
    return (
      <li key={post.fields.name} className={opacityClass}>
        <Link href={`/receipts/${post.sys.id}`}>{post.fields.name}</Link>
      </li>
    );
  });

  const options = categorydata.map((category: any) => (
    <option key={category.fields.name} value={category.fields.name}>
      {category.fields.name}
    </option>
  ));

  function optionsChangeHandler(event: ChangeEvent<HTMLSelectElement>): void {
    if (event.currentTarget) {
      let f = postdata;
      if (event.currentTarget.value !== ``) {
        f = postdata.filter((post) => {
          return post.fields.category
            .map((category) => category.fields.name)
            .includes(event.currentTarget.value);
        });
      }

      setFilteredPosts(f);
    }
  }

  return (
    <div>
      <select onChange={optionsChangeHandler}>
        <option value="">Alle</option>
        {options}
      </select>
      <ul>{postListItems}</ul>
    </div>
  );
}
