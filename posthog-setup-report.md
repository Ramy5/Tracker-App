<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into the Tracker subscription management app. The following changes were made:

- **Installed** `posthog-react-native` and required Expo peer dependencies (`expo-file-system`, `expo-application`, `expo-device`, `expo-localization`)
- **Created** `app.config.js` to expose PostHog config via `expo-constants` extras
- **Created** `src/config/posthog.ts` — PostHog client singleton with batching, feature flags, and lifecycle event capture
- **Updated** `app/_layout.tsx` — added `PostHogProvider` wrapper and manual screen tracking via `usePathname`
- **Added** user identification and event capture to auth flows (sign-in, sign-up, sign-out)
- **Added** subscription view tracking when users expand subscription details
- **Added** profile update tracking when users save profile changes

| Event                 | Description                                                       | File                                                |
| --------------------- | ----------------------------------------------------------------- | --------------------------------------------------- |
| `user_signed_in`      | User successfully completed sign-in with email and password       | `app/(auth)/sign-in.tsx`                            |
| `user_signed_up`      | User successfully created an account and verified their email     | `app/(auth)/sign-up.tsx`                            |
| `user_signed_out`     | User signed out from the settings screen                          | `app/(tabs)/settings/index.tsx`                     |
| `subscription_viewed` | User expanded a subscription item to view its details             | `components/home/subscription/SubscriptionList.tsx` |
| `profile_updated`     | User saved changes to their profile (name and/or profile picture) | `app/(tabs)/settings/edit-profile.tsx`              |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- **Dashboard**: [Analytics basics](https://us.posthog.com/project/272257/dashboard/1431559)
- **Insight**: [Signup to Sign-in Conversion Funnel](https://us.posthog.com/project/272257/insights/v0DhOgov)
- **Insight**: [Daily active users: sign-ins & signups](https://us.posthog.com/project/272257/insights/Hdc6N9oU)
- **Insight**: [Subscription views over time](https://us.posthog.com/project/272257/insights/pZnMQkJF)
- **Insight**: [Sign-out churn (daily)](https://us.posthog.com/project/272257/insights/z7iZvtrZ)
- **Insight**: [Profile updates over time](https://us.posthog.com/project/272257/insights/F9j0gYjH)

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
