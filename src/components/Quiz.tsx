"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, ArrowLeft, RefreshCw, ShoppingCart, CheckCircle, Sparkles } from "lucide-react";
import { Product, products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import Image from "next/image";

interface QuizProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Question {
  id: number;
  text: string;
  options: {
    label: string;
    value: string;
    points: Record<string, number>; // Maps product id to recommendation score points
  }[];
}

const quizQuestions: Question[] = [
  {
    id: 1,
    text: "What is your primary health or wellness concern?",
    options: [
      {
        label: "Joint stiffness, knee pain, or muscle backache",
        value: "joint_pain",
        points: { "pain-x-oil": 10 }
      },
      {
        label: "Kidney stones, burning micturition, or urinary toxins",
        value: "kidney_stone",
        points: { "stone-x-capsule": 10 }
      },
      {
        label: "Dandruff flakes, dry scalp, or hair root itching",
        value: "dandruff",
        points: { "dr-dandruff-serum": 10 }
      },
      {
        label: "Low daily stamina, general fatigue, or weaker immunity",
        value: "nutrition",
        points: { "moringa-x-capsule": 10 }
      },
      {
        label: "Anal swelling, burning piles pain, or fissure discomfort",
        value: "piles",
        points: { "piles-x-oil": 10 }
      }
    ]
  },
  {
    id: 2,
    text: "How long has this condition been bothering you?",
    options: [
      {
        label: "Recent onset (less than 1 month)",
        value: "recent",
        points: { "pain-x-oil": 1, "dr-dandruff-serum": 1, "piles-x-oil": 1 }
      },
      {
        label: "Sub-acute (1 to 6 months)",
        value: "moderate",
        points: { "stone-x-capsule": 2, "pain-x-oil": 2, "dr-dandruff-serum": 2, "piles-x-oil": 2 }
      },
      {
        label: "Chronic (longer than 6 months)",
        value: "chronic",
        points: { "stone-x-capsule": 3, "pain-x-oil": 3, "dr-dandruff-serum": 3, "piles-x-oil": 3, "moringa-x-capsule": 2 }
      }
    ]
  },
  {
    id: 3,
    text: "Select the body characteristic that resonates most with you:",
    options: [
      {
        label: "Prone to cold, joint cracking, dry skin, gas/bloating (Vata dominancy)",
        value: "vata",
        points: { "pain-x-oil": 3, "moringa-x-capsule": 2 }
      },
      {
        label: "Sensitive to heat, prone to scalp oils, acne, inflammation (Pitta dominancy)",
        value: "pitta",
        points: { "dr-dandruff-serum": 3, "piles-x-oil": 2, "stone-x-capsule": 1 }
      },
      {
        label: "Sluggish metabolism, heavy body frame, fluid retention (Kapha dominancy)",
        value: "kapha",
        points: { "stone-x-capsule": 3, "moringa-x-capsule": 2 }
      },
      {
        label: "Balanced energy or unsure about body type",
        value: "balanced",
        points: { "moringa-x-capsule": 2 }
      }
    ]
  },
  {
    id: 4,
    text: "What is your main objective with this treatment?",
    options: [
      {
        label: "Fast topical relief from sharp pain or burning sensations",
        value: "fast_relief",
        points: { "pain-x-oil": 3, "piles-x-oil": 3, "dr-dandruff-serum": 2 }
      },
      {
        label: "Long-term internal cleansing and cellular repair",
        value: "long_term",
        points: { "stone-x-capsule": 3, "moringa-x-capsule": 3 }
      },
      {
        label: "Complete daily vitality, nutrition, and prevention",
        value: "vitality",
        points: { "moringa-x-capsule": 4 }
      }
    ]
  }
];

export const Quiz: React.FC<QuizProps> = ({ isOpen, onClose }) => {
  const { addToCart } = useCart();
  const [step, setStep] = useState(0); // 0: Welcome, 1-4: Questions, 5: Calculating, 6: Result
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [scores, setScores] = useState<Record<string, number>>({
    "pain-x-oil": 0,
    "stone-x-capsule": 0,
    "dr-dandruff-serum": 0,
    "moringa-x-capsule": 0,
    "piles-x-oil": 0
  });
  const [recommendedProduct, setRecommendedProduct] = useState<Product | null>(null);

  // Prevent scroll when quiz is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Handle calculating loader transition
  useEffect(() => {
    if (step === 5) {
      const timer = setTimeout(() => {
        // Calculate winner
        let winningId = "pain-x-oil";
        let maxScore = -1;
        Object.entries(scores).forEach(([id, score]) => {
          if (score > maxScore) {
            maxScore = score;
            winningId = id;
          }
        });

        const product = products.find((p) => p.id === winningId) || products[0];
        setRecommendedProduct(product);
        setStep(6);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [step, scores]);

  const handleStart = () => {
    setStep(1);
    setAnswers({});
    setScores({
      "pain-x-oil": 0,
      "stone-x-capsule": 0,
      "dr-dandruff-serum": 0,
      "moringa-x-capsule": 0,
      "piles-x-oil": 0
    });
  };

  const handleSelectOption = (questionId: number, optionValue: string, optionPoints: Record<string, number>) => {
    // Save answer
    setAnswers({ ...answers, [questionId]: optionValue });

    // Update scores
    const updatedScores = { ...scores };
    Object.entries(optionPoints).forEach(([prodId, pts]) => {
      updatedScores[prodId] = (updatedScores[prodId] || 0) + pts;
    });
    setScores(updatedScores);

    // Navigate
    if (questionId < quizQuestions.length) {
      setStep(step + 1);
    } else {
      setStep(5); // Transition to calculation screen
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleAddToCart = () => {
    if (recommendedProduct) {
      addToCart(recommendedProduct, 1);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#113E21]/60 backdrop-blur-md flex items-center justify-center p-4">
      {/* Modal Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl relative flex flex-col max-h-[90vh]"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-30 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-50 rounded-full transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Welcome Screen */}
        {step === 0 && (
          <div className="p-8 md:p-12 text-center space-y-6 flex flex-col justify-center items-center my-auto">
            <div className="w-16 h-16 bg-[#8FA89B]/10 rounded-full flex items-center justify-center text-[#113E21]">
              <Sparkles className="w-8 h-8 text-[#3B7A57]" />
            </div>
            <div className="space-y-2">
              <h2 className="font-serif text-2xl md:text-3xl font-extrabold text-[#113E21]">
                Find Your Ayurvedic Zen
              </h2>
              <p className="text-slate-500 text-sm max-w-md mx-auto">
                Answer 4 simple questions about your symptoms and lifestyle. Our algorithm maps your answers to specific herb efficacies to find the perfect HerbsZen treatment.
              </p>
            </div>
            <button
              onClick={handleStart}
              className="bg-[#113E21] hover:bg-[#1a5632] text-white py-4 px-10 rounded-full font-bold tracking-wide transition-all shadow-lg hover:shadow-xl flex items-center gap-2 group cursor-pointer"
            >
              <span>Begin Consult</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <div className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase">
              Takes Less Than 1 Minute • Free Analysis
            </div>
          </div>
        )}

        {/* Questions Steps */}
        {step >= 1 && step <= 4 && (
          <div className="p-6 md:p-10 flex flex-col h-full overflow-y-auto">
            {/* Progress indicators */}
            <div className="w-full flex items-center gap-2 mb-6">
              <button
                onClick={handleBack}
                className="p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-50"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#113E21] transition-all duration-300"
                  style={{ width: `${(step / quizQuestions.length) * 100}%` }}
                />
              </div>
              <span className="text-xs font-bold text-slate-400">
                Step {step} of {quizQuestions.length}
              </span>
            </div>

            {/* Question Text */}
            <h3 className="font-serif text-xl md:text-2xl font-bold text-[#113E21] mb-6">
              {quizQuestions[step - 1].text}
            </h3>

            {/* Options List */}
            <div className="space-y-3 flex-1">
              {quizQuestions[step - 1].options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleSelectOption(step, option.value, option.points)}
                  className={`w-full text-left p-4 rounded-2xl border text-sm font-semibold transition-all flex items-center justify-between group cursor-pointer ${
                    answers[step] === option.value
                      ? "border-[#113E21] bg-[#8FA89B]/10 text-[#113E21]"
                      : "border-slate-200 hover:border-[#8FA89B] hover:bg-slate-50/50 text-slate-700"
                  }`}
                >
                  <span>{option.label}</span>
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                      answers[step] === option.value
                        ? "border-[#113E21] bg-[#113E21]"
                        : "border-slate-300 group-hover:border-[#8FA89B]"
                    }`}
                  >
                    {answers[step] === option.value && <div className="w-2 h-2 rounded-full bg-white" />}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Calculating screen */}
        {step === 5 && (
          <div className="p-12 text-center space-y-6 flex flex-col justify-center items-center my-auto">
            <div className="w-16 h-16 relative flex items-center justify-center">
              <RefreshCw className="w-10 h-10 text-[#3B7A57] animate-spin" />
            </div>
            <div className="space-y-2">
              <h3 className="font-serif text-xl font-bold text-[#113E21]">Analyzing Your Profile</h3>
              <p className="text-xs text-slate-400 max-w-xs mx-auto animate-pulse">
                Mapping symptoms to Tri-Dosha components (Vata, Pitta, Kapha) and filtering active herbal remedies...
              </p>
            </div>
          </div>
        )}

        {/* Results Screen */}
        {step === 6 && recommendedProduct && (
          <div className="flex flex-col md:flex-row h-full overflow-y-auto">
            {/* Left Image / Recommendation Highlight */}
            <div className="md:w-5/12 bg-slate-50 p-6 md:p-8 flex flex-col justify-center items-center border-b md:border-b-0 md:border-r border-slate-100">
              <div className="text-center mb-4">
                <span className="text-[10px] font-bold text-[#3B7A57] bg-[#3B7A57]/10 px-3 py-1 rounded-full uppercase tracking-wider">
                  Recommended For You
                </span>
              </div>
              <div className="relative w-44 h-44 rounded-2xl overflow-hidden border border-slate-200 bg-white mb-4 shadow-md">
                <Image
                  src={recommendedProduct.image}
                  alt={recommendedProduct.name}
                  fill
                  className="object-cover"
                />
              </div>
              <h4 className="font-serif text-lg font-bold text-[#113E21] text-center">
                {recommendedProduct.name}
              </h4>
              <p className="text-xs text-slate-400 mt-1 uppercase font-semibold tracking-widest">
                {recommendedProduct.category}
              </p>
            </div>

            {/* Right details & action */}
            <div className="md:w-7/12 p-6 md:p-8 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-1.5 text-emerald-600 font-bold text-sm">
                  <CheckCircle className="w-4 h-4" />
                  <span>Dosha Diagnosis Complete</span>
                </div>
                <h3 className="font-serif text-xl font-bold text-[#113E21]">
                  Why this is your perfect fit:
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Based on your symptoms and goal of **{answers[4] === "fast_relief" ? "fast symptom relief" : "long-term healing" }**, our formulation offers the optimal herbal composition. It contains key active herbs like **{recommendedProduct.ingredients[0].name}** which directly target your concern.
                </p>
                <div className="space-y-2">
                  <h5 className="text-xs font-bold uppercase text-slate-400 tracking-wider">Key Benefits</h5>
                  <ul className="text-xs text-slate-600 space-y-1.5">
                    {recommendedProduct.benefits.slice(0, 3).map((benefit, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-[#3B7A57] font-bold mt-0.5">•</span>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 space-y-3">
                <div className="flex justify-between items-baseline border-t border-slate-100 pt-3">
                  <span className="text-xs font-medium text-slate-500">Course Selling Price</span>
                  <span className="text-lg font-bold text-[#113E21]">
                    ₹{recommendedProduct.price.toFixed(2)}
                  </span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={handleStart}
                    className="p-3 border border-slate-200 rounded-full hover:bg-slate-50 transition-colors text-slate-500 cursor-pointer"
                    title="Retake Quiz"
                  >
                    <RefreshCw className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-[#113E21] hover:bg-[#1a5632] text-white py-3.5 px-6 rounded-full font-bold tracking-wide transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 cursor-pointer text-sm"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>Add to Cart & View</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};
