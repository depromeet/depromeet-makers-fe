export default function AdminPage() {
  return <></>;
}

export const getServerSideProps = () => {
  return {
    redirect: {
      destination: '/admin/attendance',
      permanent: false,
    },
  };
};
