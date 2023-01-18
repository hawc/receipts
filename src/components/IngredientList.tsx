import { useRef, forwardRef, useImperativeHandle } from 'react';
import { share } from '@/lib/browserApi';

const IngredientList = forwardRef(({ list }: { list: any }, ref) => {
  useImperativeHandle(ref, () => ({
    share(): void {
      share(ingredients.current?.innerText);
    },
  }));
  const ingredients = useRef();
  return (
    <table className="table is-fu llwidth">
      <thead>
        <tr>
          <th>Menge</th>
          <th>Zutat</th>
        </tr>
      </thead>
      <tbody ref={ingredients}>
        {list.map((ingredient) => (
          <tr key={`${ingredient.name}-${ingredient.measurement}`}>
            <td>
              {ingredient.amount}
              {` `}
              {ingredient.measurement}
            </td>
            <td>{ingredient.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
});
IngredientList.displayName = `IngredientList`;

export { IngredientList };