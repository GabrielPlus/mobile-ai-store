/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(routes)/my-tickets` | `/(routes)/onboarding` | `/(routes)/support-center` | `/(tabs)` | `/(tabs)/` | `/(tabs)/courses` | `/(tabs)/profile` | `/(tabs)/resources` | `/_sitemap` | `/courses` | `/my-tickets` | `/onboarding` | `/profile` | `/resources` | `/support-center`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
