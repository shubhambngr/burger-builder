import { shallow, configure } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

import { BurgerBuilder } from "./BurgerBuilder";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";

configure({ adapter: new Adapter() });

describe("BurgerBuilder", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<BurgerBuilder onInitIngs={() => {}} />);
  });

  it("show BuildControls if ings loaded", () => {
    wrapper.setProps({
      ings: { salad: 1 },
    });
    expect(wrapper.find(BuildControls)).toHaveLength(1);
  });
});
