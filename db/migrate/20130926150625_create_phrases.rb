class CreatePhrases < ActiveRecord::Migration
  def change
    create_table :phrases do |t|
      t.string :text
      t.integer :min 
      t.integer :max
    end
  end
end
