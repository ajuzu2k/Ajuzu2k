import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

const HotelCostSplitter = () => {
  const [totalCost, setTotalCost] = useState('');
  const [participants, setParticipants] = useState([
    { name: '', nights: '' }
  ]);

  const addParticipant = () => {
    setParticipants([...participants, { name: '', nights: '' }]);
  };

  const updateParticipant = (index, field, value) => {
    const newParticipants = [...participants];
    newParticipants[index][field] = value;
    setParticipants(newParticipants);
  };

  const calculateCosts = () => {
    const totalNights = participants.reduce((sum, p) => sum + (parseFloat(p.nights) || 0), 0);
    
    return participants.map(participant => {
      const nights = parseFloat(participant.nights) || 0;
      const individualCost = totalCost ? (nights / totalNights * parseFloat(totalCost)).toFixed(2) : '0.00';
      
      return {
        name: participant.name,
        nights: nights,
        cost: individualCost
      };
    });
  };

  const costBreakdown = calculateCosts();

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Hotel Cost Splitter</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label>Total Hotel Cost</Label>
            <Input 
              type="number" 
              value={totalCost}
              onChange={(e) => setTotalCost(e.target.value)}
              placeholder="Enter total hotel cost"
              className="mt-2"
            />
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Participants</h3>
            {participants.map((participant, index) => (
              <div key={index} className="flex space-x-2 mb-2">
                <Input 
                  placeholder="Name" 
                  value={participant.name}
                  onChange={(e) => updateParticipant(index, 'name', e.target.value)}
                  className="flex-grow"
                />
                <Input 
                  type="number" 
                  placeholder="Nights" 
                  value={participant.nights}
                  onChange={(e) => updateParticipant(index, 'nights', e.target.value)}
                  className="w-24"
                />
              </div>
            ))}
            <Button onClick={addParticipant} variant="outline" className="w-full">
              Add Participant
            </Button>
          </div>

          {totalCost && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Cost Breakdown</h3>
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-left">Name</th>
                    <th className="text-center">Nights</th>
                    <th className="text-right">Cost</th>
                  </tr>
                </thead>
                <tbody>
                  {costBreakdown.map((breakdown, index) => (
                    <tr key={index}>
                      <td>{breakdown.name}</td>
                      <td className="text-center">{breakdown.nights}</td>
                      <td className="text-right">${breakdown.cost}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default HotelCostSplitter;