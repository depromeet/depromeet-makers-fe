import styled from 'styled-components';

import { SnackBar } from '@/components/SnackBar';
import { useGetNotification } from '@/hooks/apis/notification/useGetNotification';
import { useReadNotifiaction } from '@/hooks/apis/notification/useReadNotification';

export const Notification = () => {
  const { data: notification } = useGetNotification();
  const { mutate } = useReadNotifiaction();

  const handleClose = () => {
    mutate({ notificationId: notification?.id || '' });
  };

  if (notification?.isRead) return <></>;

  return (
    <StyledSnackBar showClose id={notification?.id || ''} message={notification?.content || ''} onClose={handleClose} />
  );
};

const StyledSnackBar = styled(SnackBar)`
  margin-bottom: 16px;
`;
