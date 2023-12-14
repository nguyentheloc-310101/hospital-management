import { create } from 'zustand';

interface State {
  allTreatment: any[];
}
type Action = {
  setAllTreatment: (visitors: State['allTreatment']) => void;
};

const useTreatmentStore = create<State & Action>((set) => ({
  allTreatment: [],
  setAllTreatment: (allTreatment: any[]) =>
    set(() => ({ allTreatment: allTreatment })),
}));

function useTreatment() {
  let allTreatment = useTreatmentStore((state: any) => state.allTreatment);
  let setAllTreatment = useTreatmentStore((state) => state.setAllTreatment);

  return { allTreatment, setAllTreatment };
}
export default useTreatment;
