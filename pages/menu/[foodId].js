import { useRouter } from "next/router";
import React from "react";
import DetailsPage from "../../components/templates/DetailsPage";

function FoodDetails({ data }) {
  const router = useRouter();
  if (router.isFallback) return <h1>loading page ...</h1>;
  return <DetailsPage {...data} />;
}

export default FoodDetails;
export async function getStaticProps(context) {
  const { params } = context;
  const res = await fetch(`${process.env.BASE_URL}/data/${params.foodId}`);
  if (!res.ok) return { notFound: true };
  const data = await res.json();

  return { props: { data }, revalidate: +process.env.REVALDAITE };
}
export async function getStaticPaths() {
  const res = await fetch(`${process.env.BASE_URL}/data`);
  const data = await res.json();
  const paths = data.map((food) => ({
    params: { foodId: food.id.toString() },
  }));
  return { paths, fallback: true };
}
