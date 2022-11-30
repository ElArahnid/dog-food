import "./index.css";

const SeachInfo = ({ searchText, searchCount }) => {

// функцмя склонения по датам и прочему
const printNumerals = (number, titles) => {
  number = Math.abs(number);
  if (Number.isInteger(number)) {
    const cases = [2, 0, 1, 1, 1, 2];
    const text =
      titles[
      number % 100 > 4 && number % 100 < 20
        ? 2
        : cases[number % 10 < 5 ? number % 10 : 5]
      ];
    return `${text}`;
  }
  return `${titles[1]}`;
};

  return (
    searchText && (
      <section className="search-title">
        По запросу <span>{searchText}</span> найдено {searchCount} {printNumerals(searchCount, ["товар", "товара", "товаров"])}
      </section>
    )
  );
};

export default SeachInfo;
