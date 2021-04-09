import { shallowMount } from "@vue/test-utils";
import TodoItems from "../../src/components/TodoItems.vue";
require("jest-fetch-mock").enableMocks();

jest.mock("axios", () => ({
  get: () =>
    Promise.resolve({
      data: [
        {
          todoID: "412fff91-8a78-4214-82c4-2381eedfecdf",
          text: "Buy some milk",
          done: false,
        },
      ],
    }),
  delete: () =>
    Promise.resolve({
      data: [],
    }),
}));

describe("Rendering and functioning correctly", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(TodoItems, {});
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
    wrapper.setData({
      todos: [
        {
          todoID: "412fff91-8a78-4214-82c4-2381eedfecdf",
          text: "Buy some milk",
          done: false,
        },
      ],
    });

    await wrapper.vm.deleteTodo({
      todoID: "412fff91-8a78-4214-82c4-2381eedfecdf",
      text: "Buy some milk",
      done: false,
    });

    expect(wrapper.vm.todos).toStrictEqual([]);
  });
});
