import { act, renderHook } from "@testing-library/react";
import { UserPreferencesProvider } from "./UserPreferencesContext";
import { THEME } from "../../shared/types";
import { useUserPreferences } from "./useUserPreferences";

describe("UserPreferencesContext", () => {
    it("should allow get device type from the context", () => {
        const testDeviceType = "Macbook Pro M2";
        const previousDeviceType = window.navigator.userAgent;

        Object.defineProperty(window.navigator, "userAgent", {
            configurable: true,
            value: testDeviceType,
        });

        const { result } = renderHook(() => useUserPreferences(), { wrapper: UserPreferencesProvider });
        expect(result.current.deviceType).toEqual(testDeviceType);

        Object.defineProperty(window.navigator, "userAgent", {
            configurable: true,
            value: previousDeviceType,
        });
    });

    it("should allow update window's width and height on its resize", () => {
        const testWindowWidth = 600;
        const testResizedWindowWidth = 1100;
        const previousInnerWidth = window.innerWidth;
        const testWindowHeight = 500;
        const testResizedWindowHeight = 1000;
        const previousInnerHeight = window.innerHeight;

        Object.defineProperty(window, "innerWidth", {
            configurable: true,
            value: testWindowWidth,
        });

        Object.defineProperty(window, "innerHeight", {
            configurable: true,
            value: testWindowHeight,
        });

        const { result } = renderHook(() => useUserPreferences(), { wrapper: UserPreferencesProvider });

        expect(result.current.windowWidth).toEqual(testWindowWidth);
        expect(result.current.windowHeight).toEqual(testWindowHeight);

        Object.defineProperty(window, "innerWidth", {
            configurable: true,
            value: testResizedWindowWidth,
        });

        Object.defineProperty(window, "innerHeight", {
            configurable: true,
            value: testResizedWindowHeight,
        });

        act(() => {
            window.dispatchEvent(new Event("resize"));
        });

        expect(result.current.windowWidth).toEqual(testResizedWindowWidth);
        expect(result.current.windowHeight).toEqual(testResizedWindowHeight);

        Object.defineProperty(window, "innerWidth", {
            configurable: true,
            value: previousInnerWidth,
        });

        Object.defineProperty(window, "innerHeight", {
            configurable: true,
            value: previousInnerHeight,
        });
    });

    it("should allow get and update theme", () => {
        const { result } = renderHook(() => useUserPreferences(), { wrapper: UserPreferencesProvider });

        expect(result.current.theme).toEqual(THEME.LIGHT);

        act(() => {
            result.current.switchTheme();
        });

        expect(result.current.theme).toEqual(THEME.DARK);
    });
})