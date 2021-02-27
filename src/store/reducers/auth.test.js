import * as actions from "../actions/actionTypes";
import reducer from "./auth";

describe("auth Reducer", () => {
  let initState;
  beforeEach(() => {
    initState = {
      token: null,
      userId: null,
      error: null,
      loading: false,
      authInit: false,
    };
  });

  it("should return initState for wrong action", () => {
    expect(reducer(initState, {})).toEqual(initState);
  });

  it("should store token and id for successful login", () => {
    expect(
      reducer(initState, {
        type: actions.AUTH_SUCCESS,
        idToken: "token",
        userId: "userId",
      })
    ).toEqual({
      ...initState,
      token: "token",
      userId: "userId",
    });
  });
});
