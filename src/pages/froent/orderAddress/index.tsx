import React from 'react';
import { useHistory, useLocation } from 'umi';

function OrderAddress() {
  const location = useLocation() as any
  const history = useHistory()
  const id = location.query.id
  return (
    <div>
      OrderAddress
    </div>
  );
}

export default OrderAddress;
