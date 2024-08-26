export default function ListItem(props) {
  const { name, age, year } = props.item;

  return (
    <li className=" text-lg text-red-700">
      {name}/ {age}/ {year}
    </li>
  );
}
