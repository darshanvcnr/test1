import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/components/ui/use-toast';
import { Heart, DollarSign } from 'lucide-react';

function DonationsPage() {
  const { toast } = useToast();
  const [amount, setAmount] = useState(50);
  const [customAmount, setCustomAmount] = useState('');
  const [frequency, setFrequency] = useState('one-time');
  const presetAmounts = [25, 50, 100, 250];

  const handleDonate = () => {
    toast({
      title: "🚧 Feature Not Implemented",
      description: "This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
    });
  };

  const handleAmountClick = (val) => {
    setAmount(val);
    setCustomAmount('');
  }

  const handleCustomAmountChange = (e) => {
    const val = e.target.value;
    setCustomAmount(val);
    if(val) {
      setAmount(Number(val));
    } else if (presetAmounts.includes(amount)) {
      // do nothing, keep preset
    } else {
      setAmount(0);
    }
  }

  return (
    <>
      <Helmet>
        <title>Give - Support Revival Tabernacle Ministries Church</title>
        <meta name="description" content="Support the ministry and mission of Revival Tabernacle Ministries Church through your generous giving. Every donation helps us spread the message of faith, hope, and love." />
      </Helmet>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-grow">
          <section className="relative py-20 md:py-32 hero-gradient text-white">
            <div className="container-max text-center">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl md:text-6xl font-display font-bold"
              >
                Support Our Ministry
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mt-4 text-lg md:text-xl max-w-3xl mx-auto text-white/90"
              >
                Your generous giving empowers us to spread the message of faith, hope, and love. 
                Thank you for partnering with us to make a difference.
              </motion.p>
            </div>
          </section>

          <section className="section-padding -mt-16">
            <div className="container-max">
              <div className="grid lg:grid-cols-2 gap-12 items-start">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <Card className="shadow-xl border-none">
                    <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-t-lg">
                      <CardTitle className="text-2xl font-bold text-center text-white">Give Generously</CardTitle>
                    </CardHeader>
                    <CardContent className="p-8 bg-white rounded-b-lg">
                      <div className="space-y-6">
                        <div>
                          <Label className="text-lg font-semibold text-gray-800">Choose Frequency</Label>
                          <RadioGroup defaultValue="one-time" className="flex space-x-4 mt-2" onValueChange={setFrequency} value={frequency}>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="one-time" id="one-time" />
                              <Label htmlFor="one-time">One-Time</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="monthly" id="monthly" />
                              <Label htmlFor="monthly">Monthly</Label>
                            </div>
                          </RadioGroup>
                        </div>

                        <div>
                          <Label className="text-lg font-semibold text-gray-800">Select Amount</Label>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                            {presetAmounts.map(pa => (
                              <Button key={pa} variant={amount === pa && !customAmount ? 'default' : 'outline'} className={`text-lg py-6 ${amount === pa && !customAmount ? 'btn-primary' : 'bg-white text-purple-700 border-purple-200 hover:bg-purple-50'}`} onClick={() => handleAmountClick(pa)}>
                                ${pa}
                              </Button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="custom-amount" className="text-lg font-semibold text-gray-800">Or Enter Custom Amount</Label>
                          <div className="relative mt-2">
                            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <Input 
                              id="custom-amount" 
                              type="number" 
                              placeholder="e.g. 75" 
                              className="pl-10 text-lg h-12"
                              value={customAmount}
                              onChange={handleCustomAmountChange}
                            />
                          </div>
                        </div>

                        <Button onClick={handleDonate} className="w-full btn-primary text-xl py-8">
                          <Heart className="w-6 h-6 mr-3" />
                          Donate ${amount > 0 ? amount : 0} {frequency === 'monthly' ? 'Monthly' : ''}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div 
                  className="space-y-6 pt-12 lg:pt-0"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-4xl font-bold font-display text-gray-900">Why Your Gift Matters</h2>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    "Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver." - 2 Corinthians 9:7
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    Your contributions are vital to our church's mission. They support our weekly services, community outreach programs, youth and children's ministries, and the maintenance of our church home. Through your generosity, we can continue to be a beacon of light and hope in our community and beyond.
                  </p>
                  <div className="p-6 bg-purple-50 border-l-4 border-purple-500 rounded-r-lg">
                    <p className="text-purple-800 font-medium">All donations are tax-deductible. You will receive a receipt for your contribution.</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default DonationsPage;