import React from 'react';

const ItemCard = ({ item, onPrimaryAction, onSecondaryAction, isAdmin }) => (
  <div className="item-card">
    <img src={item.imageUrl} alt={item.description} />
    <div className="item-details">
      <p>Found Item: {item.foundItem}</p>
      <p>Reporter's Name: {item.reporterName}</p>
      <p>Description: {item.description}</p>
      <p>Reporter's Phone No.: {item.reporterPhone}</p>
      <p>Date Reported: {item.dateReported}</p>
      {isAdmin && (
        <>
          <p>Claimant's Name: {item.claimantName}</p>
          <p>Claimant's Phone No.: {item.claimantPhone}</p>
        </>
      )}
    </div>
    <div className="item-actions">
      <button onClick={onPrimaryAction}>{isAdmin ? 'Approve Claim' : 'Claim Item'}</button>
      {isAdmin && <button onClick={onSecondaryAction}>Decline Claim</button>}
    </div>
  </div>
);

export default ItemCard;
