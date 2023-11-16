import { useAuth0 } from "@auth0/auth0-react";

const Secret = () => {
  const { isAuthenticated } = useAuth0();

  return (
    isAuthenticated && (
      <div>
        <p>Welcome!</p>
      </div>
    )
  );
};

export default Secret;
