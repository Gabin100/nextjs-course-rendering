import { GetServerSideProps } from 'next';

type UserProfilePageProps = {
  username: string;
};

function UserProfilePage(props: UserProfilePageProps) {
  return (
    <div>
      <h1>{props.username}</h1>
    </div>
  );
}

export default UserProfilePage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      username: 'Gabin',
    },
  };
};
