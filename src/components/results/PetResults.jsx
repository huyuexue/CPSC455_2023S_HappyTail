import { useSelector, useDispatch } from "react-redux";
import { openDetailView, selectPet } from "../petDetail/petDetailSlice";
import { initialState } from "../pets/petsSlice";

export default function PetCard() {
  const dispatch = useDispatch();
  const pets = useSelector(state => state.pets.list);

  return (
    <div>
      {pets.map(pet => (
        <div
          className="pet"
          key={pet.id}
          onClick={() => {
            dispatch(selectPet(pet));
            dispatch(openDetailView());
          }}
        >
          <div className="imageContainer">
            <img src={pet.pictureUrl} alt="Not available" />
          </div>
          <h3>{pet.name}</h3>
        </div>
      ))}
    </div>
  );
}