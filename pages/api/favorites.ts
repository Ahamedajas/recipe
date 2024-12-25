import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@/lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = await clientPromise;
  const db = client.db();

  switch (req.method) {
    case 'POST':
      try {
        const { recipeId, recipeName, imageUrl } = req.body;

        // Insert recipe into the database
        await db.collection('favorite_recipes').insertOne({
          recipeId,
          recipeName,
          imageUrl,
        });

        res.status(201).json({ message: 'Recipe added to favorites!' });
      } catch (error) {
        console.error('Error adding to favorites:', error);
        res.status(500).json({ error: 'Failed to add recipe to favorites.' });
      }
      break;

    case 'GET':
      try {
        const favorites = await db
          .collection('favorite_recipes')
          .find({})
          .toArray();

        res.status(200).json(favorites);
      } catch (error) {
        console.error('Error fetching favorites:', error);
        res.status(500).json({ error: 'Failed to fetch favorites.' });
      }
      break;

    case 'DELETE':
      try {
        const { recipeId } = req.body;

        // Delete recipe from favorites
        const deletionResult = await db
          .collection('favorite_recipes')
          .deleteOne({ recipeId });

        if (deletionResult.deletedCount === 0) {
          return res.status(404).json({ error: 'Recipe not found in favorites.' });
        }

        res.status(200).json({ message: 'Recipe removed from favorites!' });
      } catch (error) {
        console.error('Error removing from favorites:', error);
        res.status(500).json({ error: 'Failed to remove recipe from favorites.' });
      }
      break;

    default:
      // Handle unsupported HTTP methods
      res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
