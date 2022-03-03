import { FC } from "react";
import { ViewProps } from "react-native";
import styled from "styled-components/native"; // Property 'View' does not exist on type 'ThemedStyledInterface<DefaultTheme>'.
import {
  space,
  layout,
  color,
  flexbox,
  SpaceProps,
  LayoutProps,
  ColorProps,
  BorderProps,
  PositionProps,
  FlexboxProps,
} from "styled-system";

type StyledProps = SpaceProps &
  LayoutProps &
  ColorProps &
  BorderProps &
  PositionProps &
  FlexboxProps &
  ViewProps;

export interface ContainerProps extends StyledProps {
  as?: any;
  flexDirection: "row" | "column";
}

const Container: FC<ContainerProps> = styled.View<ContainerProps>(
  flexbox,
  space,
  layout,
  color
);

export default Container;
