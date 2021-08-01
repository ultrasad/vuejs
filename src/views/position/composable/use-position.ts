import { onMounted, reactive, toRefs } from "vue";
import {
  findAll,
  create,
  remove,
  findOne,
  update,
} from "@/services/position-service";
import { Position } from "@/types/position-types";
import { useRoute, useRouter } from "vue-router";
import Swal from "sweetalert2";

export function useIndex() {
  // const fullname = ref("Hanajung"); //reference
  const state = reactive({
    position: [] as Position[], //convert to type
    errorMessage: "",
    isLoading: false,
    // position: [
    //   {
    //     id: 1,
    //     title: "IT",
    //   },
    //   {
    //     id: 2,
    //     title: "Manager",
    //   },
    //   {
    //     id: 3,
    //     title: "Hr",
    //   },
    //   {
    //     id: 4,
    //     title: "Mate",
    //   },
    // ],
    // email: "bb@gmail.com",
    // age: 20,
  });

  // const hello = () => {
  //     fullname.value = "Youngdek"; //ref to index of fullname value
  //     state.email = "changeme@yahoo.com";
  // };

  // life cycle
  const getData = async (): Promise<void> => {
    try {
      state.isLoading = true;
      const response = await findAll();
      state.position = response.data;
      // console.log(response.data);
      // return response;
    } catch (error: any) {
      // status code: 400, 500, 401
      console.log(JSON.stringify(error));
      state.errorMessage = `เกิดข้อผิดพลาดจากระบบ, ${error.message}`;
    } finally {
      state.isLoading = false;
    }
  };

  //on first load
  onMounted(() => {
    getData();
    // const data = getData();
    // console.log(data);
    // state.position = data;
  });

  return {
    // fullname,
    // hello,
    ...toRefs(state),
  };
}

export function useCreate() {
  const state = reactive({
    position: {} as Position,
  });

  const router = useRouter();

  const onSubmit = async () => {
    // alert('OK');
    const response = await create(state.position);
    if (response.data) {
      console.log("เพิ่มข้อมูลสำเร็จ");
      Swal.fire("เพิ่มข้อมูลสำเร็จ", "กลับไปยังหน้ารายการตำแหน่ง!", "success");
      await router.replace({ name: "PositionIndex" });
    }
  };

  return {
    ...toRefs(state),
    onSubmit,
  };
}

export function useRemove() {
  const state = reactive({
    position: {} as Position,
  });

  const router = useRouter();

  const onRemove = async (id: number) => {
    // alert('OK');
    const isConfirm = window.confirm("ยืนยันการลบข้อมูล");
    if (isConfirm) {
      const response = await remove(id);
      if (response.data) {
        console.log("ลบข้อมูลสำเร็จ");
        Swal.fire(
          response.data.message,
          "กลับไปยังหน้ารายการตำแหน่ง!",
          "success"
        );
        // await router.replace({ name: "PositionIndex" });
        router.go(0);
      }
    }
  };

  return {
    onRemove,
  };
}

export function useUpdate() {
  const state = reactive({
    position: {} as Position,
  });

  const router = useRouter(); // navigation
  const route = useRoute(); // params

  onMounted(() => {
    state.position.id = +route.params.id; // add(+) for convert string to number
    findById(state.position.id);
    console.log(`Edit Id: ${state.position.id}`);
  });

  const findById = async (id: number) => {
    const response = await findOne(id);
    state.position = response.data;
  };

  const onSubmit = async () => {
    // alert('OK');
    const response = await update(state.position.id, state.position);
    if (response.data) {
      console.log("แก้ไขข้อมูลสำเร็จ");
      Swal.fire("แก้ไขข้อมูลสำเร็จ", "กลับไปยังหน้ารายการตำแหน่ง!", "success");
      await router.replace({ name: "PositionIndex" });
    }
  };

  return {
    ...toRefs(state),
    onSubmit,
  };
}
