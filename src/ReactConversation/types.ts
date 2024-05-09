import { ControllerProps } from "react-hook-form";

export type ControlledInput<I> = I & Pick<ControllerProps, "name">;
