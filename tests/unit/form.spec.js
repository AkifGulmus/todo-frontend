import { shallowMount } from "@vue/test-utils";
import Form from "../../src/components/Form.vue";
require("jest-fetch-mock").enableMocks();

const client = require("../../client");

describe("Rendering properly and having the correct elements", () => {
  const spy = jest.spyOn(client, "addItem");
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(Form, {});
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("exists and renders correctly", () => {
    const addItemForm = wrapper.findAll("input");
    const addItemButton = wrapper.findAll("#addButton");
    expect(addItemForm.length).toBe(1);
    expect(addItemButton.length).toBe(1);
  });

  it("triggers post request when new item is added", () => {
    wrapper.setData({ newTodo: "Buy some milk" });
    const addItemButtons = wrapper.findAll("#addButton");
    expect(addItemButtons).toHaveLength(1);
    addItemButtons.at(0).trigger("click");
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
