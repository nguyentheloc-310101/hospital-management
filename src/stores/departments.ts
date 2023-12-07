import { IDepartment } from '@/types/interfaces';
import { create } from 'zustand';

interface State {
  allDepartments: IDepartment[];
}
type Action = {
  setAllDepartment: (visitors: State['allDepartments']) => void;
};

const useDeptStore = create<State & Action>((set) => ({
  allDepartments: [],
  setAllDepartment: (allDepartments: IDepartment[]) =>
    set(() => ({ allDepartments: allDepartments })),
}));

function useDepartment() {
  let allDepartments = useDeptStore((state: any) => state.allDepartments);
  let setAllDepartment = useDeptStore((state) => state.setAllDepartment);

  return { allDepartments, setAllDepartment };
}
export default useDepartment;
