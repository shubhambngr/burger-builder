import { shallow, configure } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

import NavItems from "./NavItems";
import NavItem from "./NavItem/NavItem";

configure({ adapter: new Adapter() });

describe("NavItems", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<NavItems />);
  });

  it("should render 2 NavItem components if not authenticated", () => {
    expect(wrapper.find(NavItem)).toHaveLength(2);
  });

  it("should render 3 NavItem components if authenticated", () => {
    wrapper.setProps({ isAuth: true });
    expect(wrapper.find(NavItem)).toHaveLength(3);
  });

  it("Logout is only seen if authenticated", () => {
    wrapper.setProps({ isAuth: true });
    expect(wrapper.contains(<NavItem link="/logout">Logout</NavItem>)).toEqual(
      true
    );
  });
});
