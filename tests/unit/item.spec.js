import { shallowMount } from "@vue/test-utils";
import Item from "../../src/components/Item.vue";

describe("todo items existing and rendering correctly", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(Item, {
      propsData: {
        todo: {
          todoID: "412fff91-8a78-4214-82c4-2381eedfecdf",
          text: "Buy some milk",
          done: false,
        },
      },
    });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("exists and renders as a single todo item with text and done attributes", () => {
    expect(wrapper.findAll("p").length).toBe(1);
    const doneBoxes = wrapper.findAll("#checkbox");
    expect(doneBoxes.length).toBe(1);
  });

  it("emits event when todo text is clicked", () => {
    const items = wrapper.findAll("p");
    expect(items.length).toBe(1);
    const doneBoxes = wrapper.findAll("#checkbox");
    expect(doneBoxes.length).toBe(1);
    items.at(0).trigger("click");
    expect(wrapper.emitted().todoStatusUpdated).toStrictEqual([
      [
        {
          done: false,
          text: "Buy some milk",
          todoID: "412fff91-8a78-4214-82c4-2381eedfecdf",
        },
      ],
    ]);
  });

  it("emits event when delete button is clicked", () => {
    const deleteButtons = wrapper.findAll("#deleteButton");
    expect(deleteButtons.length).toBe(1);
    deleteButtons.at(0).trigger("click");
    expect(wrapper.emitted().todoDeleted).toStrictEqual([
      [
        {
          done: false,
          text: "Buy some milk",
          todoID: "412fff91-8a78-4214-82c4-2381eedfecdf",
        },
      ],
    ]);
  });
});
