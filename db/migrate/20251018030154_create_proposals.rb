class CreateProposals < ActiveRecord::Migration[6.1]
  def change
    create_table :proposals do |t|
      t.text :mission
      t.text :goal
      t.text :generated_draft
      t.string :tone

      t.timestamps
    end
  end
end
