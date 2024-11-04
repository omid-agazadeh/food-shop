import { useState } from "react";
import styles from "./CategoriesPage.module.css";
import { useRouter } from "next/router";
import Card from "../modules/Card";

function CategoriesPage({ data }) {
  const router = useRouter();

  const [query, setQuery] = useState({ difficulty: router.query.difficulty, time: router.query.time });

  const changeHandler = (e) => {
    setQuery({ ...query, [e.target.name]: e.target.value });
  };
  const searchHandler = () => {
    router.push({ pathname: "/categories", query });
  };
  return (
    <div className={styles.container}>
      <h2>Categories</h2>
      <div className={styles.subContainer}>
        <div className={styles.select}>
          <select
            onChange={changeHandler}
            value={query.difficulty}
            name="difficulty"
          >
            <option value="">Difficulty</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
          <select onChange={changeHandler} value={query.time} name="time">
            <option value="">Cooking time</option>
            <option value="more">More then 30 min</option>
            <option value="less">Less then 30 min</option>
          </select>
          <button onClick={searchHandler}>Search</button>
        </div>
        <div className={styles.cards}>
          {!data.length ? (
            <img src="/images/search.png" alt="Category" />
          ) : null}
          {data.map((food) => (
            <Card key={food.id} {...food} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default CategoriesPage;
