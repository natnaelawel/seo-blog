import Head from "next/head";

export const getPhotoUrl = (name) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URI}/uploads/${name}`;
  return url;
};
export const getPhotoExt = (name) => {
  return name.substring(0, name.lastIndexOf("."));
};

export const BlogHead = (blog, pathname) => {
  return (
    <Head>
      <title>
        {blog.title} | {process.env.NEXT_APP_NAME}
      </title>
      <meta name="" content={`${blog.title}`} />
      <link rel="canonical" href={`${process.env.NEXT_DOMAIN}/${pathname}`} />
      <meta
        property="og:title"
        content={`Latest Web Development Tutorials | ${process.env.NEXT_APP_NAME}`}
      />
      <meta property="og:description" content={`${blog.title}`} />
      <meta property="og:type" content="website" />
      <meta
        property="og:url"
        content={`${process.env.NEXT_DOMAIN}${pathname}`}
      />
      <meta property="og:site_name" content={process.env.NEXT_APP_NAME} />
      <meta property="og:image" content={getPhotoUrl(blog.photo)} />
      <meta property="og:image:secure_url" content={getPhotoUrl(blog.photo)} />
      <meta
        property="og:image:type"
        content={`image/${getPhotoExt(blog.photo)}`}
      />
      <meta property="fb:app_id" content={process.env.NEXT_FB_APP_ID} />
    </Head>
  );
};
