import { shallowMount } from "@vue/test-utils";
import List from "../../src/components/List.vue";

jest.mock("../../client", () => ({
  getTodos: () =>
    Promise.resolve({
      data: [
        {
          todoID: "412fff91-8a78-4214-82c4-2381eedfecdf",
          text: "Buy some milk",
          done: false,
        },
      ],
    }),
  deleteTodo: () =>
    Promise.resolve({
      status: 202,
    }),
}));

describe("Rendering and functioning correctly", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(List, {});
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("calls the fetch method when component is created and gets one todo item", async () => {
    expect(wrapper.vm.todos).toStrictEqual([
      {
        todoID: "412fff91-8a78-4214-82c4-2381eedfecdf",
        text: "Buy some milk",
        done: false,
      },
    ]);
  });

  it("removes todo item when deleteTodo() is called", async () => {
    await wrapper.vm.deleteTodo({
      todoID: "412fff91-8a78-4214-82c4-2381eedfecdf",
      text: "Buy some milk",
      done: false,
    });
    expect(wrapper.vm.todos).toStrictEqual([]);
  });
});
