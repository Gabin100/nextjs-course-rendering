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
  const { params, req, res } = context;

  console.log('UserProfilePage getServerSideProps => ', 'Server Side Code');

  return {
    props: {
      username: 'Gabin',
    },
  };
};
