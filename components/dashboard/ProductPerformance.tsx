import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const topProducts = [
  {
    name: 'Wireless Headphones',
    unitsSold: 245,
    revenue: '$24,500',
    progress: 85,
  },
  {
    name: 'Smartphone Case',
    unitsSold: 189,
    revenue: '$18,900',
    progress: 70,
  },
  {
    name: 'Bluetooth Speaker',
    unitsSold: 156,
    revenue: '$15,600',
    progress: 60,
  },
  {
    name: 'Laptop Stand',
    unitsSold: 134,
    revenue: '$13,400',
    progress: 50,
  },
  {
    name: 'USB Cable',
    unitsSold: 98,
    revenue: '$9,800',
    progress: 35,
  },
];

export default function ProductPerformance() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Performing Products</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {topProducts.map((product, index) => (
            <div key={product.name} className="space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">{product.name}</p>
                  <p className="text-sm text-gray-600">
                    {product.unitsSold} units sold
                  </p>
                </div>
                <p className="font-medium text-gray-900">{product.revenue}</p>
              </div>
              <Progress value={product.progress} className="h-2" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}