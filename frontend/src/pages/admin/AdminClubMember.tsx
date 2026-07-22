import { useClubMember } from '@/features/club-member/hooks/useClubMember';
import { ClubMemberTable } from '@/features/club-member/ui/ClubMemberTable';
import { Loader } from '@/ui';

export const AdminClubMember = () => {
  const { data, isLoading, isError, error } = useClubMember();

  if (isLoading) return <Loader />;
  if (isError) return <>{error.message}</>;
  if (!data) return <>Список сотрудников пуст</>;
  return (
    <>
      <ClubMemberTable data={data.data} pagination={data.pagination} />
    </>
  );
};
