import "react";

declare module "react" {
  interface CSSProperties {
    "--tile-aspect-ratio"?: number;
  }
}
