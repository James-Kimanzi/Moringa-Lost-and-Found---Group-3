import React from 'react';
import ItemCard from '../../components/ItemCard';
import SearchBar from '../../components/SearchBar';

const FoundItems = () => {
  const items = [
    {
      imageUrl: 'path/to/image.jpg',
      foundItem: 'Handbag',
      reporterName: 'Larry Page',
      description: 'A brown leather denri handbag',
      reporterPhone: '+254-111-111-111',
      dateReported: '10.07.2024'
    },
    // more items
  ];

  const handleSearch = (query) => {
    console.log('Searching for:', query);
  };

  const handleClaim = () => {
    console.log('Claim item');
  };

  return (
    <div className="inventory">
      <SearchBar placeholder="Search Found Items in Inventory" onSearch={handleSearch} />
      <div className="items-grid">
        {items.map((item, index) => (
          <ItemCard 
            key={index} 
            item={item} 
            onPrimaryAction={handleClaim} 
            isAdmin={false}
          />
        ))}
      </div>
    </div>
  );
};

export default FoundItems;
