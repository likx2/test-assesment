import React from "react";
import { screen, render, fireEvent } from "@testing-library/react";
import Main from "./Main";
import { UserPreferencesProvider } from "../../context/UserPreferencesContext";
import { THEME } from "../../shared/types";

describe("<Main />", () => {
    it("should match the snapshot", () => {
        const { asFragment } = render(
            <UserPreferencesProvider>
                <Main/>
            </UserPreferencesProvider>
        );

        expect(asFragment()).toMatchSnapshot();
    });

    it("should render user preferences", () => {
        const testDeviceType = "Macbook Pro M2";
        const previousDeviceType = window.navigator.userAgent;
        const testWindowWidth = 600;
        const previousInnerWidth = window.innerWidth;
        const testWindowHeight = 500;
        const previousInnerHeight = window.innerHeight;

        Object.defineProperty(window.navigator, "userAgent", {
            configurable: true,
            value: testDeviceType,
        });

        Object.defineProperty(window, "innerWidth", {
            configurable: true,
            value: testWindowWidth,
        });

        Object.defineProperty(window, "innerHeight", {
            configurable: true,
            value: testWindowHeight,
        });

        render(
            <UserPreferencesProvider>
                <Main/>
            </UserPreferencesProvider>
        );

        expect(screen.getByText(testDeviceType)).toBeInTheDocument();
        expect(screen.getByText(testWindowWidth)).toBeInTheDocument();
        expect(screen.getByText(testWindowHeight)).toBeInTheDocument();
        expect(screen.getByText(THEME.LIGHT)).toBeInTheDocument();

        Object.defineProperty(window.navigator, "userAgent", {
            configurable: true,
            value: previousDeviceType,
        });

        Object.defineProperty(window, "innerWidth", {
            configurable: true,
            value: previousInnerWidth,
        });

        Object.defineProperty(window, "innerHeight", {
            configurable: true,
            value: previousInnerHeight,
        });
    });

    it("should update theme", () => {
        render(
            <UserPreferencesProvider>
                <Main/>
            </UserPreferencesProvider>
        );

        expect(screen.getByText(THEME.LIGHT)).toBeInTheDocument();

        const button = screen.getByRole("button");

        fireEvent.click(button);

        expect(screen.getByText(THEME.DARK)).toBeInTheDocument();
    });
});