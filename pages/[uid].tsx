import { GetServerSideProps } from 'next';

type UserIdPageProps = {
  id: string;
};
function UserIdPage(props: UserIdPageProps) {
  return (
    <div>
      <h1>{props.id}</h1>
    </div>
  );
}

export default UserIdPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params } = context;
  const userId = params ? params.uid : '';
  return {
    props: {
      id: 'Userid-' + userId,
    },
  };
};
