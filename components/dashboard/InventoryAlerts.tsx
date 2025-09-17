import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, XCircle } from 'lucide-react';

const lowStockProducts = [
  { name: 'iPhone Case - Blue', stock: 8, threshold: 10 },
  { name: 'Laptop Charger', stock: 5, threshold: 15 },
  { name: 'Wireless Mouse', stock: 3, threshold: 10 },
];

const outOfStockProducts = [
  { name: 'Premium Headphones', lastSold: '2024-01-10' },
  { name: 'Gaming Keyboard', lastSold: '2024-01-08' },
];

export default function InventoryAlerts() {
  return (
    <div className="space-y-6">
      {/* Low Stock */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-yellow-600" />
            <span>Low Stock Products</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {lowStockProducts.map((product) => (
              <div
                key={product.name}
                className="flex items-center justify-between p-3 border border-yellow-200 rounded-lg bg-yellow-50"
              >
                <div>
                  <p className="font-medium text-gray-900">{product.name}</p>
                  <p className="text-sm text-gray-600">
                    Only {product.stock} left in stock
                  </p>
                </div>
                <Badge variant="outline" className="text-yellow-700 border-yellow-300">
                  Low Stock
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Out of Stock */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <XCircle className="h-5 w-5 text-red-600" />
            <span>Out of Stock Products</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {outOfStockProducts.map((product) => (
              <div
                key={product.name}
                className="flex items-center justify-between p-3 border border-red-200 rounded-lg bg-red-50"
              >
                <div>
                  <p className="font-medium text-gray-900">{product.name}</p>
                  <p className="text-sm text-gray-600">
                    Last sold: {product.lastSold}
                  </p>
                </div>
                <Badge variant="outline" className="text-red-700 border-red-300">
                  Out of Stock
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}