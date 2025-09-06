import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Minus, 
  Calendar, 
  DollarSign, 
  Users, 
  Info,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import { MARKET_CATEGORIES, MARKET_TYPES } from '@/lib/web3';

const CreateMarketPage = () => {
  const [formData, setFormData] = useState({
    question: '',
    description: '',
    category: '',
    marketType: 'PAID',
    duration: 7, // days
    initialLiquidity: 1000,
    earlyResolution: false,
    // Free market specific
    maxFreeParticipants: 100,
    tokensPerParticipant: 10,
    // Options
    options: [
      { name: 'Yes', description: '' },
      { name: 'No', description: '' }
    ]
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: null
      }));
    }
  };

  const handleOptionChange = (index, field, value) => {
    const newOptions = [...formData.options];
    newOptions[index] = {
      ...newOptions[index],
      [field]: value
    };
    setFormData(prev => ({
      ...prev,
      options: newOptions
    }));
  };

  const addOption = () => {
    if (formData.options.length < 10) {
      setFormData(prev => ({
        ...prev,
        options: [...prev.options, { name: '', description: '' }]
      }));
    }
  };

  const removeOption = (index) => {
    if (formData.options.length > 2) {
      const newOptions = formData.options.filter((_, i) => i !== index);
      setFormData(prev => ({
        ...prev,
        options: newOptions
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.question.trim()) {
      newErrors.question = 'Question is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!formData.category) {
      newErrors.category = 'Category is required';
    }

    if (formData.duration < 1 || formData.duration > 365) {
      newErrors.duration = 'Duration must be between 1 and 365 days';
    }

    if (formData.initialLiquidity < 100) {
      newErrors.initialLiquidity = 'Initial liquidity must be at least 100 tokens';
    }

    // Validate options
    const validOptions = formData.options.filter(opt => opt.name.trim());
    if (validOptions.length < 2) {
      newErrors.options = 'At least 2 options are required';
    }

    // Check for duplicate option names
    const optionNames = validOptions.map(opt => opt.name.trim().toLowerCase());
    if (new Set(optionNames).size !== optionNames.length) {
      newErrors.options = 'Option names must be unique';
    }

    // Free market specific validation
    if (formData.marketType === 'FREE_ENTRY') {
      if (formData.maxFreeParticipants < 1) {
        newErrors.maxFreeParticipants = 'Must allow at least 1 participant';
      }
      if (formData.tokensPerParticipant < 1) {
        newErrors.tokensPerParticipant = 'Must give at least 1 token per participant';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Here you would integrate with the smart contract
      console.log('Creating market with data:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Reset form on success
      setFormData({
        question: '',
        description: '',
        category: '',
        marketType: 'PAID',
        duration: 7,
        initialLiquidity: 1000,
        earlyResolution: false,
        maxFreeParticipants: 100,
        tokensPerParticipant: 10,
        options: [
          { name: 'Yes', description: '' },
          { name: 'No', description: '' }
        ]
      });
      
      alert('Market created successfully!');
    } catch (error) {
      console.error('Error creating market:', error);
      alert('Failed to create market. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const calculateTotalCost = () => {
    let total = formData.initialLiquidity;
    
    if (formData.marketType === 'FREE_ENTRY') {
      total += formData.maxFreeParticipants * formData.tokensPerParticipant;
    }
    
    return total;
  };

  const categories = Object.keys(MARKET_CATEGORIES).map(key => ({
    value: key,
    label: key.charAt(0) + key.slice(1).toLowerCase()
  }));

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
          Create New Market
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Create a prediction market for others to trade on
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info className="w-5 h-5" />
              Basic Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="question">Market Question *</Label>
              <Input
                id="question"
                placeholder="e.g., Will Bitcoin reach $100,000 by the end of 2024?"
                value={formData.question}
                onChange={(e) => handleInputChange('question', e.target.value)}
                className={errors.question ? 'border-red-500' : ''}
              />
              {errors.question && (
                <p className="text-sm text-red-500 mt-1">{errors.question}</p>
              )}
            </div>

            <div>
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                placeholder="Provide more details about the market conditions and resolution criteria..."
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                className={errors.description ? 'border-red-500' : ''}
                rows={3}
              />
              {errors.description && (
                <p className="text-sm text-red-500 mt-1">{errors.description}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="category">Category *</Label>
                <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                  <SelectTrigger className={errors.category ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.category && (
                  <p className="text-sm text-red-500 mt-1">{errors.category}</p>
                )}
              </div>

              <div>
                <Label htmlFor="marketType">Market Type</Label>
                <Select value={formData.marketType} onValueChange={(value) => handleInputChange('marketType', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PAID">Paid Market</SelectItem>
                    <SelectItem value="FREE_ENTRY">Free Entry Market</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Market Options */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              Market Options
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {formData.options.map((option, index) => (
              <div key={index} className="flex gap-4 items-start">
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor={`option-name-${index}`}>Option {index + 1} Name</Label>
                    <Input
                      id={`option-name-${index}`}
                      placeholder="e.g., Yes"
                      value={option.name}
                      onChange={(e) => handleOptionChange(index, 'name', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor={`option-desc-${index}`}>Description (Optional)</Label>
                    <Input
                      id={`option-desc-${index}`}
                      placeholder="Additional details..."
                      value={option.description}
                      onChange={(e) => handleOptionChange(index, 'description', e.target.value)}
                    />
                  </div>
                </div>
                {formData.options.length > 2 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeOption(index)}
                    className="mt-6"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                )}
              </div>
            ))}
            
            {errors.options && (
              <p className="text-sm text-red-500">{errors.options}</p>
            )}

            {formData.options.length < 10 && (
              <Button
                type="button"
                variant="outline"
                onClick={addOption}
                className="w-full"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Option
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Market Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Market Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="duration">Duration (days) *</Label>
                <Input
                  id="duration"
                  type="number"
                  min="1"
                  max="365"
                  value={formData.duration}
                  onChange={(e) => handleInputChange('duration', parseInt(e.target.value) || 0)}
                  className={errors.duration ? 'border-red-500' : ''}
                />
                {errors.duration && (
                  <p className="text-sm text-red-500 mt-1">{errors.duration}</p>
                )}
              </div>

              <div>
                <Label htmlFor="initialLiquidity">Initial Liquidity (tokens) *</Label>
                <Input
                  id="initialLiquidity"
                  type="number"
                  min="100"
                  value={formData.initialLiquidity}
                  onChange={(e) => handleInputChange('initialLiquidity', parseInt(e.target.value) || 0)}
                  className={errors.initialLiquidity ? 'border-red-500' : ''}
                />
                {errors.initialLiquidity && (
                  <p className="text-sm text-red-500 mt-1">{errors.initialLiquidity}</p>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="earlyResolution"
                checked={formData.earlyResolution}
                onCheckedChange={(checked) => handleInputChange('earlyResolution', checked)}
              />
              <Label htmlFor="earlyResolution">Allow early resolution</Label>
            </div>
          </CardContent>
        </Card>

        {/* Free Market Settings */}
        {formData.marketType === 'FREE_ENTRY' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Free Market Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="maxFreeParticipants">Max Free Participants *</Label>
                  <Input
                    id="maxFreeParticipants"
                    type="number"
                    min="1"
                    value={formData.maxFreeParticipants}
                    onChange={(e) => handleInputChange('maxFreeParticipants', parseInt(e.target.value) || 0)}
                    className={errors.maxFreeParticipants ? 'border-red-500' : ''}
                  />
                  {errors.maxFreeParticipants && (
                    <p className="text-sm text-red-500 mt-1">{errors.maxFreeParticipants}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="tokensPerParticipant">Tokens per Participant *</Label>
                  <Input
                    id="tokensPerParticipant"
                    type="number"
                    min="1"
                    value={formData.tokensPerParticipant}
                    onChange={(e) => handleInputChange('tokensPerParticipant', parseInt(e.target.value) || 0)}
                    className={errors.tokensPerParticipant ? 'border-red-500' : ''}
                  />
                  {errors.tokensPerParticipant && (
                    <p className="text-sm text-red-500 mt-1">{errors.tokensPerParticipant}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Cost Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              Cost Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Initial Liquidity:</span>
                <span>{formData.initialLiquidity} tokens</span>
              </div>
              {formData.marketType === 'FREE_ENTRY' && (
                <div className="flex justify-between">
                  <span>Prize Pool:</span>
                  <span>{formData.maxFreeParticipants * formData.tokensPerParticipant} tokens</span>
                </div>
              )}
              <div className="border-t pt-2 flex justify-between font-semibold">
                <span>Total Cost:</span>
                <span>{calculateTotalCost()} tokens</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline">
            Save as Draft
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Creating Market...' : 'Create Market'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateMarketPage;

