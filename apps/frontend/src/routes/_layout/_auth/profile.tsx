import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/_auth/profile')({
  component: ProfileComponent,
})

function ProfileComponent() {
  return <p className="text-white">Protected route /profile</p>
}
