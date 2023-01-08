import styled from 'styled-components';
import ActivitiesCard from './ActivitiesCard';

export function ActivitiesLocation({ data }) {
  const { Location } = data;
  console.log(data.data);
  return (
    <>
      <LocationAndActivities>
        <p>{Location}</p>
        {data.data.map((data, index) => 
          <ActivitiesCard key={index} data={data}/>
        )}
      </LocationAndActivities>
    </>
  );
};

const LocationAndActivities = styled.div`
  height: 391px;
  width: 300px;

  p{
    color: #7B7B7B;
    font-size: 17px;
    margin-bottom: 20px;
    text-align: center;
  }
`;
