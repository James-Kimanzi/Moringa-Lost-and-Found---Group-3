import React from 'react';
import ItemCard from '../../components/ItemCard';
import SearchBar from '../../components/SearchBar';

const Claims = () => {
  const items = [
    {
      imageUrl: 'path/to/image.jpg',
      foundItem: 'Handbag',
      reporterName: 'Dinah Ngatia',
      description: 'A brown leather denri handbag',
      reporterPhone: '+254-111-111-111',
      dateReported: '10.07.2024',
      claimantName: 'Faith Mwende',
      claimantPhone: '+254-111-111-111'
    },
    // more items
  ];

  const handleSearch = (query) => {
    console.log('Searching for:', query);
  };

  const handleApprove = () => {
    console.log('Approve claim');
  };

  const handleDecline = () => {
    console.log('Decline claim');
  };

  return (
    <div className="inventory">
      <SearchBar placeholder="Search Claimed Items in Inventory" onSearch={handleSearch} />
      <div className="items-grid">
        {items.map((item, index) => (
          <ItemCard 
            key={index} 
            item={item} 
            onPrimaryAction={handleApprove} 
            onSecondaryAction={handleDecline} 
            isAdmin={true}
          />
        ))}
      </div>
    </div>
  );
};

export default Claims;
