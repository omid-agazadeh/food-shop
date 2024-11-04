import CategoriesPage from "../../components/templates/CategoriesPage";

function Categories({ data }) {
  return <CategoriesPage data={data} />;
}

export default Categories;

export async function getServerSideProps(context) {
  const {
    query: { difficulty, time },
  } = context;
  const res = await fetch(`${process.env.BASE_URL}/data`);
  const json = await res.json();
  const filteredData = json.filter((data) => {
    const difficultyFilter = data.details.filter(
      (detail) => detail.Difficulty && detail.Difficulty === difficulty
    );
    const timeFilter = data.details.filter((detail) => {
      const preparingTime = detail["Preparation Time"] || "";
      const timeDetails = preparingTime.split(" ")[0];
      if (time === "less" && timeDetails && +timeDetails <= 30) {
        return detail;
      } else if (time === "more" && +timeDetails > 30) {
        return detail;
      }
    });

    if (time && difficulty && timeFilter.length && difficultyFilter.length) {
      return data;
    } else if (!time && difficulty && difficultyFilter.length) {
      return data;
    } else if (time && !difficulty && timeFilter.length) {
      return data;
    }
  });
  return { props: { data: filteredData } };
}
