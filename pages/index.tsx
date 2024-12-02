import { UserProfile } from '@/components/common/homePage/UserProfile';
import { withPrivateRoute } from '@/hocs/withPrivateRoute';
import React from 'react'

function Home() {
  return (
    <div>
      <UserProfile />
    </div>
  )
}
export default withPrivateRoute(Home);
